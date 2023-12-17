provider "google" {
  project     = "<firefly-408304>"
  // region      = "<us-central>"
}

variable "openai_org_key" {
  description = "API Key for the Cloud Function"
  type        = string
}


resource "google_storage_bucket" "function_source_bucket" {
  name     = "firefly-functions-bucket"
  location = "us"
}


// Function Definition
resource "google_storage_bucket_object" "news_scraper_source" {
  name   = "news_scraper.zip"
  bucket = google_storage_bucket.function_source_bucket.name
  source = "artifacts/news_scraper.zip"
}

resource "google_storage_bucket_object" "content_generator_source" {
  name   = "content_generator.zip"
  bucket = google_storage_bucket.function_source_bucket.name
  source = "artifacts/content_generator.zip"
}


// Function Setup
resource "google_cloudfunctions_function" "news_scraper" {
  name                  = "news_scraper"
  runtime               = "nodejs14"
  available_memory_mb   = 256
  source_archive_bucket = google_storage_bucket.function_source_bucket.name
  source_archive_object = google_storage_bucket_object.news_scraper_source.name
  entry_point           = "index"
  trigger_http          = true

}

resource "google_cloudfunctions_function" "content_generator" {
  name                  = "content_generator"
  runtime               = "nodejs14"
  available_memory_mb   = 256
  source_archive_bucket = google_storage_bucket.function_source_bucket.name
  source_archive_object = google_storage_bucket_object.news_scraper_source.name
  entry_point           = "index"
  trigger_http          = true

  environment_variables = {
    OPENAI_API_KEY = var.openai_org_key
  }

}