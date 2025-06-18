import time
import requests

# Coordenadas simuladas
ruta_simulada = [
    (-23.628973, -70.377217),
    (-23.634878, -70.394352),
    (-23.639116, -70.395899),
    (-23.645802, -70.398140),
    (-23.655250, -70.395155),
    (-23.676416, -70.381366),
    (-23.771780, -70.322620),
]

# URL del endpoint json-server
url_base = 'http://localhost:3000/ubicacion-bus'

# Eliminar todos los registros anteriores (si existieran)
existing = requests.get(url_base).json()
for e in existing:
    requests.delete(f"{url_base}/{e['id']}")

# Enviar nuevas posiciones con ID incremental
for idx, (lat, lon) in enumerate(ruta_simulada, start=1):
    data = {
        "id": idx,
        "latitude": lat,
        "longitude": lon
    }
    r = requests.post(url_base, json=data)
    print(f"POST {data} => {r.status_code}")
    time.sleep(1.5)