from django.http import JsonResponse


def health(request):
	"""Simple health check endpoint returning service status."""
	return JsonResponse({"status": "ok"})
