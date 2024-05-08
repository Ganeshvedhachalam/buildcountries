import React, { useEffect, useState } from "react";
const  Country = () => {
const [countries,setcountries]= useState([]);
const [error, setError] = useState(null);

    const apiUrl = "https://restcountries.com/v3.1/al"

    const Tile =({country}) =>{
        return(<>
       
          
         <div className="country" 
         style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"200px",
         border:"1px solid gray",borderRadius:"10px",margin:"10px",padding:"10px"
         }}>
            
            
            <img  style={{width:"100px",height:"100px"}} src={country.flags.png} alt="flag" />
            <h1>{country.name.common}</h1>
            
            
         </div>

       




        
        </>
        )
    }

    useEffect(() => { 
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((data) => setcountries(data))
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError(error.message);
            });
    }, []);


    return(
        <>
        {error?<div>The Error: {error}</div>:
         <div className="COUNTRYCARDS" 
         style={{ display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center" ,height:"100vh"}}
         >
           
             {countries.map((country )=> <Tile key={country.cca3} country={country}/> )}
 
             </div>
 
        }
        
        </>
    );
}
export default Country;