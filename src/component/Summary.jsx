const Summary = ({ summary, CATEGORY_COLORS }) => (
  <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto' }}>
    {Object.entries(summary).map(([name, value]) => (
      <div key={name} style={{
        background: '#fff', 
        padding: '15px',  
        borderRadius: '8px', 
        minWidth: '110px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
      <div style={{ fontSize: '12px', color: '#888', marginBottom: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: CATEGORY_COLORS[name] || '#eee', 
              marginRight: '6px',
              display: 'inline-block'
        }}></span>    
        {name}                
      </div>  
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
          {value.toLocaleString()}원
        </div>
      </div>  
    ))} 
  </div>
)
export default Summary; 