
const Input = ({
  placeholder,
  onChange,
  defaultValue,
  value,
  title,
  full,
  rows,
  type = "text",
  min,
  max,
  step,
  required,
  search
}) => {
  return (
    <div className={`flex flex-col ${!full &&  "max-w-sm"} w-full my-2`}>
      <label className="text-neutrals-500 font-body text-xs uppercase font-bold mb-2">
        {title}
      </label>
      {search ?
        <div className="relative group focus-within:outline-none ring-2 ring-neutrals-500 focus-within:ring-primary-blue rounded-xl pl-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none h-5 w-5 absolute top-1/2 transform -translate-y-1/2 stroke-current text-neutrals-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
              type={type}
              min={min}       
              max={max}
              step={step}
              required={required}
              placeholder={placeholder} 
              onChange={onChange}
              defaultValue={defaultValue}
              className="font-body pl-7 text-neutrals-300 bg-transparent px-4 py-2 w-full outline-none"
          ></input>
        </div>
      :
      rows ? (
        <textarea
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          rows={rows}
          className="resize-none font-body text-neutrals-300 bg-transparent rounded-xl px-3 py-2 focus:outline-none ring-2 ring-neutrals-500 focus:ring-primary-blue"
        ></textarea>
      ) : (
        <input
          type={type}
          min={min}
          max={max}
          step={step}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          className="font-body text-neutrals-300 bg-transparent rounded-xl px-4 py-2 focus:outline-none ring-2 ring-neutrals-500 focus:ring-primary-blue"
        ></input>
      )} 
    </div>
  );
};

export default Input;
