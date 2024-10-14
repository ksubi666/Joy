import React from 'react';

const subcategories = [
  'Subcategory1',
  'Subcategory2',
  'Subcategory3',
  'Subcategory4',
  'Subcategory5',
  'Subcategory6',
  'Subcategory7',
];

const styles = {
  subcategory:
    'w-full bg-white text-black py-[32px] flex justify-between items-center mx-auto max-w-[1200px]',
  button: 'text-2 text-[#EB4F47]  flex items-center py-2 px-4 gap-5',
};

const Subcategory = () => {
  return (
    <div className={styles.subcategory}>
      {subcategories.map((subcategory) => (
        <button key={subcategory} className={styles.button}>
          {subcategory}
        </button>
      ))}
    </div>
  );
};

export default Subcategory;
