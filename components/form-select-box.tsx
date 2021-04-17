const FormSelectBox = ({ registerRules, children }) => {
  return (
    <select
      {...registerRules}
      className="w-full mb-3 mt-2 text-purple block border-rounded-base border-gray 
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray"
    >
      {children}
    </select>
  );
};

export default FormSelectBox;
