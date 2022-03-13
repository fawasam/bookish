import React, { useEffect ,useState } from 'react';
import './Books.css'

const Filter = ({setActiveGenre ,activeGenre ,setFiltered , all ,setItem }) => {
    let genre;
    useEffect(()=>{
        if(activeGenre === 'All') {
            setFiltered(all)

        return;
       
        }else{

            const filtered =all.filter((movie)=>
            movie.genre.includes(activeGenre))
            setFiltered(filtered);
        }


    },[activeGenre ])
    return (
        <div className='filter-container'>
             <div className="mb-3">                  
                      <label for="exampleFormControlInput1" className="form-label">Filter by Genre</label><br/>
                      <select 
                      className='options form-control'
                      value={genre} required
                      onChange={e=>setActiveGenre(e.target.value)} >

                         <option >All</option>
                         <option >Action & Adventure </option>
                         <option >Autobiographies</option>
                         <option >Classics</option>
                         <option >Comic </option>
                         <option >Fiction</option>
                         <option >Romance</option>
                         <option >Mystery</option>
                         <option >Science</option>
                         <option >History</option>
                         <option >Horror</option>
                         <option >Others</option>
                       </select>
                </div>

        </div>
        
        )
};

export default Filter;
