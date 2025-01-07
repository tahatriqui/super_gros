import { useEffect, useState } from "react";
import axios from 'axios';
import { PanelsTopLeft } from "lucide-react"; // Import the default icon, you can customize later.

function Data() {
  const [categories, setCategories] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/cat") // Ensure your API is running and accessible
      .then((res) => {
        console.log(res.data); // Log data for debugging
        setCategories(res.data); // Store categories in state
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div>
      {/* Render the list of categories dynamically */}
      {categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.id}>
            {/* Displaying category name, description, and icon */}
            <p>{category.name}</p>
            <p>{category.desc}</p>
            <PanelsTopLeft />
          </div>
        ))
      ) : (
        <p>Loading categories...</p>
      )}
    </div>
  );
}

export default Data;
