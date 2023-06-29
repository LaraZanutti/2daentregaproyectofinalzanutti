<template>
  <div class="container">
    <h3 class="quienesSomos">¿QUIÉNES SOMOS?</h3>
    <div class="cuadrado">
      <p class="textoQuienesSomos">
        ¡Bienvenido/a a nuestra tienda virtual! En "Sobre nosotros", queremos
        compartir contigo la emocionante historia y los valores fundamentales
        que nos han llevado a convertirnos en una referencia en el mundo del
        comercio en línea. En nuestra empresa, creemos firmemente en la
        innovación y en brindar una experiencia de compra excepcional a nuestros
        clientes. Desde el momento en que comenzamos nuestra trayectoria, hemos
        estado comprometidos con el objetivo de ofrecer productos de alta
        calidad y servicios excepcionales para satisfacer todas tus necesidades.
        Nuestro equipo está compuesto por apasionados expertos en el sector,
        quienes trabajan arduamente para seleccionar cuidadosamente los
        productos que ofrecemos en nuestra tienda virtual. Nos esforzamos por
        ofrecerte una amplia variedad de artículos de las marcas más reconocidas
        y de los fabricantes más confiables, asegurándonos de que cada producto
        cumpla con nuestros rigurosos estándares de calidad. Además de la
        calidad de nuestros productos, nos enorgullece proporcionar un excelente
        servicio al cliente. Estamos aquí para brindarte asistencia en cada
        etapa de tu experiencia de compra, desde responder preguntas sobre
        productos hasta brindar recomendaciones personalizadas para satisfacer
        tus necesidades específicas. Tu satisfacción es nuestra máxima
        prioridad. Como tienda virtual, también nos preocupamos por el medio
        ambiente y nos esforzamos por ser una empresa sostenible. Buscamos
        constantemente formas de reducir nuestro impacto en el planeta, desde
        utilizar embalajes reciclables hasta colaborar con proveedores
        comprometidos con prácticas eco-amigables. Queremos agradecerte por
        visitar nuestra tienda virtual y confiar en nosotros para satisfacer tus
        necesidades de compra en línea. Estamos emocionados de tenerte como
        parte de nuestra comunidad y esperamos brindarte una experiencia de
        compra excepcional. Si tienes alguna pregunta, no dudes en ponerte en
        contacto con nuestro equipo de atención al cliente. Estamos aquí para
        ayudarte en todo lo que necesites. ¡Gracias por elegirnos y esperamos
        que disfrutes de tu experiencia de compra en nuestra tienda virtual!
        Atentamente, El equipo de LariZtore
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  height: 100vh;
}

@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
.quienesSomos {
  margin-top: 100px;
  font-family: "Bebas Neue", sans-serif;
  text-align: center;
  font-weight: 800;
  font-size: 80px;
  color: white;
}

.textoQuienesSomos {
  text-align: center;
  padding: 50px;
  line-height: 2;
  gap: 5px;
  color: white;
}

.cuadrado {
  text-align: center;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  letter-spacing: 0.1px;
  margin-top: 100px;
}
</style>