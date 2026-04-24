const CategoryFilter = ({ filter, CATEGORIES, CATEGORY_COLORS, setFilter }) => (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['전체', ...CATEGORIES].map(cat => (
            <button 
            key={cat}
            onClick={() => setFilter(cat)}
            style={{    
                backgroundColor: filter === cat 
                ? (cat === '전체' ? '#22c55e' : CATEGORY_COLORS[cat]?.color)
                : '#F3F4F6',
                color: filter === cat ? 'white' : '#4B5563'
            }}  
            className={`whitespace-nowrap px-4 py-2 cursor-pointer rounded-full text-sm font-semibold transition-all ${
                filter === cat ? 'shadow-md scale-105' : 'hover:bg-gray-200'
            }`}
            > 
            {cat}
            </button>
        ))}
    </div>
);

export default CategoryFilter;