Param()

$base = Get-Location
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8000/")
$listener.Start()
Write-Host "Serving $base on http://localhost:8000/"

while ($true) {
    try {
        $context = $listener.GetContext()
        $requestPath = $context.Request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($requestPath)) { $requestPath = 'index.html' }
        $filePath = Join-Path $base $requestPath

        if (-not (Test-Path $filePath)) {
            $context.Response.StatusCode = 404
            $message = "Not Found"
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($message)
            $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
            $context.Response.Close()
            continue
        }

        $bytes = [System.IO.File]::ReadAllBytes($filePath)

        # naive content type mapping
        $ext = [System.IO.Path]::GetExtension($filePath)
        switch ($ext.ToLower()) {
            ".html" { $context.Response.ContentType = "text/html" }
            ".css"  { $context.Response.ContentType = "text/css" }
            ".js"   { $context.Response.ContentType = "application/javascript" }
            ".jpg"  { $context.Response.ContentType = "image/jpeg" }
            ".jpeg" { $context.Response.ContentType = "image/jpeg" }
            ".png"  { $context.Response.ContentType = "image/png" }
            default  { $context.Response.ContentType = "application/octet-stream" }
        }

        $context.Response.ContentLength64 = $bytes.Length
        $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        $context.Response.Close()
    } catch {
        Write-Host "Error: $_"
    }
}