const Summary = ({ summary, CATEGORY_COLORS }) => (
  <div>
    {Object.entries(summary).map(([name, value]) => (
      <div key={name}>
      <div>
        <span></span>    
        {name}                
      </div>  
        <div>
          {value.toLocaleString()}원
        </div>
      </div>  
    ))} 
  </div>
)
export default Summary; 