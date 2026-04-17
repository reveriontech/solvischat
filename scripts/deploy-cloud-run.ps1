#Requires -Version 5.1
param(
    [string]$Region = 'us-west2',
    [string]$ArtifactRepo = 'solvischat',
    [string]$ServiceName = 'stellachat'
)

$ErrorActionPreference = 'Stop'
if (-not (Get-Command gcloud -ErrorAction SilentlyContinue)) {
    throw 'gcloud not on PATH. Install Google Cloud SDK and reopen the terminal.'
}

$proj = (& gcloud config get-value project 2>$null).Trim()
if (-not $proj) {
    throw 'No GCP project set. Run: gcloud config set project YOUR_PROJECT_ID'
}

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
Set-Location $root

$sub = "_REGION=$Region,_AR_REPO=$ArtifactRepo,_SERVICE_NAME=$ServiceName"

Write-Host "Project: $proj"
Write-Host "Substitutions: $sub"
& gcloud builds submit --config=cloudbuild.yaml --substitutions="$sub" .
