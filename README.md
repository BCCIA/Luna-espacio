# Configuración del Agente D-ID (Luna-espacio)

Para editar la configuración del agente embebido de D-ID:

1. Abre el archivo `index.html`.
2. Busca la etiqueta `<script type="module" src="https://agent.d-id.com/v2/index.js" ...>` cerca del final del archivo.
3. Actualiza los valores de las siguientes propiedades con los datos generados en D-ID Studio:
   - `data-client-key="TU_CLIENT_KEY"`
   - `data-agent-id="TU_AGENT_ID"`

*Nota: Mantener siempre el valor `data-target-id="did-agent-container"` para asegurar la correcta integración en la interfaz.*
