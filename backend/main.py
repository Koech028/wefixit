# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from backend.config import settings
from backend.routers import reviews, portfolio, auth as auth_router, projects

# Ensure uploads folder exists
os.makedirs("uploads", exist_ok=True)

def create_app() -> FastAPI:
    app = FastAPI(title=settings.PROJECT_NAME, version="1.0.0")

    # Serve static files
    app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

    # CORS configuration
    origins = ["http://localhost:8080"]  # React dev server
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # API routers
    app.include_router(auth_router.router, prefix="/api/v1/auth", tags=["auth"])
    app.include_router(reviews.router, prefix="/api/v1/reviews", tags=["reviews"])
    app.include_router(portfolio.router, prefix="/api/v1/portfolio", tags=["portfolio"])
    app.include_router(projects.router, prefix="/api/v1/projects", tags=["projects"])

    # Root endpoint
    @app.get("/")
    async def root():
        return {"status": "ok", "name": settings.PROJECT_NAME}

    return app

# Initialize app
app = create_app()
