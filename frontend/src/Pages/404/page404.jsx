import React from "react";

function Page404() {
 const styles = {
   container: {
     textAlign: "center",
     marginTop: "15%",
     padding: "20px",
     fontFamily: "'Poppins', sans-serif",
     marginBottom: "300px",
   },
   image: {
     width: "100%",
     height: "500px",
     marginBottom: "20px",
   },
   title: {
     fontSize: "4rem",
     color: "#CC373B",
     marginBottom: "20px",
   },
   message: {
     fontSize: "1.5rem",
     color: "#2f3542",
     marginBottom: "50px",
     maxWidth: "600px",
     margin: "0 auto",
     lineHeight: "1.8",
   },
   link: {
     textDecoration: "none",
     fontSize: "1.2rem",
     color: "white",
     backgroundColor: "black",
     padding: "12px 25px",
     borderRadius: "8px",
     transition: "all 0.3s ease-in-out",
     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
   },
   linkHover: {
     backgroundColor: "#CC373B",
     boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
   },
 };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Oops! 404</h1>
      <p style={styles.message}>La page que vous recherchez n'existe pas</p>
      <a
        href="/"
        style={{ ...styles.link, ...(isHovered ? styles.linkHover : {}) }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Retourner à l'accueil
      </a>
    </div>
  );
}

export default Page404;
