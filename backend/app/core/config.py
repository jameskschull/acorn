from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Acorn"
    VERSION: str = "0.1.0"
    ALLOWED_ORIGINS: list[str] = ["http://localhost:5173"]

    DATABASE_URL: str = "sqlite:///./acorn.db"

    class Config:
        env_file = ".env"


settings = Settings()
