import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Indique à Express de faire confiance aux en-têtes du proxy (Cloud Run / AI Studio)
  // Cela permet à express-rate-limit de récupérer la bonne adresse IP du client.
  app.set("trust proxy", 1);

  // 1. Protection contre les attaques par force brute / DoS
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limite chaque IP à 100 requêtes par fenêtre
    standardHeaders: "draft-7",
    legacyHeaders: false,
    validate: { xForwardedForHeader: false }, // Supprime l'avertissement de validation si nécessaire
    message: "Trop de requêtes depuis cette IP, veuillez réessayer plus tard.",
  });
  app.use(limiter);
  
  // 1.5. Protection contre la pollution des paramètres HTTP
  app.use(hpp());

  // 1.6. Configuration CORS stricte (partage de ressources entre origines)
  app.use(cors({
    origin: process.env.NODE_ENV === "production" ? ["https://votre-domaine-club.algerie"] : true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }));

  // 2. Sécurisation des en-têtes HTTP avec Helmet
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "default-src": ["'self'"],
          "script-src": [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'", // Gardé pour la compatibilité Vite/React dev, peut être retiré en production pure
            "https://www.instagram.com",
            "https://platform.instagram.com"
          ],
          "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          "img-src": [
            "'self'",
            "data:",
            "https://*.cdninstagram.com",
            "https://*.fbcdn.net",
            "https://images.unsplash.com",
            "https://grainy-gradients.vercel.app",
            "https://picsum.photos"
          ],
          "font-src": ["'self'", "https://fonts.gstatic.com"],
          "frame-src": ["'self'", "https://www.instagram.com"],
          "connect-src": ["'self'", "https://www.instagram.com"],
          "object-src": ["'none'"],
          "upgrade-insecure-requests": [],
        },
      },
      crossOriginEmbedderPolicy: false,
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      crossOriginOpenerPolicy: { policy: "same-origin" },
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    })
  );

  // API routes can be added here
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
