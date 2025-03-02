from transformers import pipeline
import random
import json

class AsistenteProductos:
    def __init__(self):
        # Inicializar clasificador de intenciones
        self.clasificador = pipeline(
            "zero-shot-classification",
            model="MoritzLaurer/mDeBERTa-v3-base-mnli-xnli"
        )

        # Base de datos simulada de productos
        self.productos = {
            "1": {"nombre": "Televisor Samsung 55 pulgadas", "precio": 1800000, "calidad": "buena", "disponible": True},
            "2": {"nombre": "Lavadora LG 12kg", "precio": 1200000, "calidad": "buena", "disponible": True},
            "3": {"nombre": "Celular Xiaomi Redmi Note 10", "precio": 750000, "calidad": "regular", "disponible": True},
            "4": {"nombre": "Licuadora Oster", "precio": 180000, "calidad": "buena", "disponible": False},
            "5": {"nombre": "Audífonos inalámbricos", "precio": 65000, "calidad": "mala", "disponible": True},
            "6": {"nombre": "Computador portátil HP", "precio": 2200000, "calidad": "buena", "disponible": True},
            "7": {"nombre": "Microondas Whirlpool", "precio": 320000, "calidad": "regular", "disponible": False},
            "8": {"nombre": "Tablet Samsung", "precio": 900000, "calidad": "buena", "disponible": True},
            "9": {"nombre": "Cámara Canon", "precio": 1500000, "calidad": "buena", "disponible": True},
            "10": {"nombre": "Parlante Bluetooth JBL", "precio": 230000, "calidad": "regular", "disponible": True},
            "11": {"nombre": "Nevera Haceb No Frost", "precio": 1700000, "calidad": "buena", "disponible": True},
            "12": {"nombre": "Ventilador de techo", "precio": 140000, "calidad": "mala", "disponible": True}
        }

        # Expresiones colombianas por categoría
        self.expresiones = {
            "saludos": [
                "¡Quiubo parcero!", "¿Qué más pues?", "¡Hola mi llave!",
                "¿Cómo va la cosa, mijo?", "¿Qué hubo?", "¡Buenas!",
                "¿Qué dice la gente?", "¿Todo bien o qué?"
            ],
            "precios_altos": [
                "Uy no, está carito, mi hermano", "Pilla, ese vale un billete largo",
                "Uy papa, eso está como caro", "Eso vale un platal, mijo",
                "Se le va a pelar el bolsillo con ese", "Uy, toca vender un riñón pa' comprarlo"
            ],
            "precios_bajos": [
                "Re barato, parce", "Está regalado, mi llave",
                "Por esa plata, llévelo de una", "Eso sí que es un buen negocio",
                "Dele de una, que está baratísimo", "Por ese precio, ni lo piense"
            ],
            "buena_calidad": [
                "Es una chimba ese producto", "Uy, ese producto es muy teso",
                "Eso sí que es calidad, pai", "Esta máquina es de las buenas",
                "Ese producto es una belleza", "Papá, eso es garantía"
            ],
            "mala_calidad": [
                "Uy no parce, eso es puro chicharrón", "Ese producto es pura paja",
                "No vale la pena, es muy guache", "Eso es un producto todo chafa",
                "Ni se le ocurra, eso es puro cuento", "Eso sale malo, socio"
            ],
            "no_disponible": [
                "Paila, no hay", "Se acabaron, mi llave",
                "Qué boleta, pero no tenemos", "Está en veremos ese producto",
                "No hay ni pa' remedio", "Se voló ese producto, mano"
            ],
            "disculpas": [
                "Qué pena con usted", "Uy, me corchó ahí",
                "Perdón, me quedé sin palabras", "Uy, ahí sí me dejó en blanco",
                "Me la puso difícil", "Ahí sí me corchó, socio"
            ],
            "despedidas": [
                "Bueno parcero, nos pillamos", "Hasta lueguito pues",
                "Que le vaya bien, mi vale", "Chao pues, vuelva pronto",
                "Nos estamos viendo", "Cuídese, mi llave"
            ]
        }

    def extraer_id_producto(self, texto):
        """Intenta extraer un ID de producto del texto."""
        if "id" in texto.lower() or "código" in texto.lower() or "producto" in texto.lower():
            palabras = texto.lower().replace(":", " ").replace(",", " ").split()
            for i, palabra in enumerate(palabras):
                if palabra in ["id", "código", "producto", "referencia", "ref"]:
                    if i + 1 < len(palabras) and palabras[i + 1].isdigit():
                        return palabras[i + 1]

        # Buscar cualquier número en el texto como último recurso
        for palabra in texto.split():
            if palabra.isdigit() and palabra in self.productos:
                return palabra

        return None

    def clasificar_intencion(self, texto):
        """Clasifica la intención del usuario."""
        labels = ["precio", "recomendacion", "disponibilidad", "calidad", "general"]
        resultado = self.clasificador(texto, candidate_labels=labels)
        return resultado['labels'][0]

    def responder_precio(self, id_producto):
        """Responde sobre el precio de un producto."""
        if id_producto not in self.productos:
            return random.choice(self.expresiones["disculpas"]) + ", no encuentro ese producto. ¿Seguro que el ID está bien?"

        producto = self.productos[id_producto]
        precio_formateado = f"{producto['precio']:,}".replace(",", ".")

        if producto['precio'] > 1000000:
            expresion = random.choice(self.expresiones["precios_altos"])
        else:
            expresion = random.choice(self.expresiones["precios_bajos"])

        return f"{expresion}. El {producto['nombre']} vale {precio_formateado} pesitos colombianos."

    def responder_recomendacion(self, id_producto):
        """Responde si recomienda o no un producto."""
        if id_producto not in self.productos:
            return random.choice(self.expresiones["disculpas"]) + ", no conozco ese producto. ¿De cuál estamos hablando?"

        producto = self.productos[id_producto]

        if producto['calidad'] == "buena":
            expresion = random.choice(self.expresiones["buena_calidad"])
            return f"{expresion}. Te recomiendo el {producto['nombre']} a ojos cerrados, mi llave."
        elif producto['calidad'] == "regular":
            return f"Vea pues, el {producto['nombre']} no es tan malo, pero tampoco es una maravilla. Si tiene el presupuesto, dele de una."
        else:
            expresion = random.choice(self.expresiones["mala_calidad"])
            return f"{expresion}. Yo no le recomendaría el {producto['nombre']}, parce."

    def responder_disponibilidad(self, id_producto):
        """Responde sobre la disponibilidad de un producto."""
        if id_producto not in self.productos:
            return random.choice(self.expresiones["disculpas"]) + ", no reconozco ese producto."

        producto = self.productos[id_producto]

        if producto['disponible']:
            return f"Claro que sí, mi llave. El {producto['nombre']} está disponible. ¿Lo quiere apartar?"
        else:
            expresion = random.choice(self.expresiones["no_disponible"])
            return f"{expresion}. El {producto['nombre']} no está disponible por el momento."

    def responder_calidad(self, id_producto):
        """Responde sobre la calidad de un producto."""
        if id_producto not in self.productos:
            return random.choice(self.expresiones["disculpas"]) + ", no tengo ese producto en mi inventario."

        producto = self.productos[id_producto]

        if producto['calidad'] == "buena":
            expresion = random.choice(self.expresiones["buena_calidad"])
            return f"{expresion}. El {producto['nombre']} es de muy buena calidad, no se va a arrepentir."
        elif producto['calidad'] == "regular":
            return f"Pues vea, el {producto['nombre']} no es lo mejor, pero tampoco lo peor. Es como del montón, ¿si me entiende?"
        else:
            expresion = random.choice(self.expresiones["mala_calidad"])
            return f"{expresion}. El {producto['nombre']} no es lo que esperaría, la verdad."

    def responder_general(self, id_producto):
        """Da información general sobre un producto."""
        if id_producto not in self.productos:
            return "No conozco ese producto, mi llave. ¿Me puede dar otro ID?"

        producto = self.productos[id_producto]
        precio_formateado = f"{producto['precio']:,}".replace(",", ".")

        disponibilidad = "está disponible" if producto['disponible'] else "no está disponible por el momento"

        calidad_map = {
            "buena": "es una chimba, muy buena calidad",
            "regular": "es regular, del montón",
            "mala": "no es muy bueno que digamos"
        }

        return f"Sobre el {producto['nombre']}, le cuento que cuesta {precio_formateado} pesitos, {disponibilidad} y {calidad_map[producto['calidad']]}."

    def procesar_consulta(self, texto):
        """Procesa la consulta del usuario y genera una respuesta."""
        id_producto = self.extraer_id_producto(texto)
        intencion = self.clasificar_intencion(texto)

        # Si no encontramos un ID pero la consulta parece necesitarlo
        if id_producto is None and intencion != "general":
            return "Oiga parce, ¿de cuál producto me está hablando? Necesito el ID para ayudarle mejor."

        # Responder según la intención detectada
        if intencion == "precio":
            return self.responder_precio(id_producto)
        elif intencion == "recomendacion":
            return self.responder_recomendacion(id_producto)
        elif intencion == "disponibilidad":
            return self.responder_disponibilidad(id_producto)
        elif intencion == "calidad":
            return self.responder_calidad(id_producto)
        else:
            # Si tenemos un ID, dar información general
            if id_producto:
                return self.responder_general(id_producto)
            else:
                return "¿En qué le puedo colaborar, mi llave? ¿Quiere saber de algún producto en particular?"

    def interactuar(self):
        """Maneja la interacción con el usuario."""
        print(random.choice(self.expresiones["saludos"]))
        print("Soy el vendedor de productos, ¿en qué le puedo ayudar?")

        while True:
            entrada = input("\n> ")

            if entrada.lower() in ['salir', 'chao', 'adios', 'hasta luego', 'nos vemos']:
                print(random.choice(self.expresiones["despedidas"]))
                break

            respuesta = self.procesar_consulta(entrada)
            print(respuesta)

# if __name__ == "__main__":
#     asistente = AsistenteProductos()
#     asistente.interactuar()