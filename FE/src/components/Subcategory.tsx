import Link from 'next/link';

const styles = {
  subcategory:
    'w-full bg-white text-black py-[32px] flex items-center mx-auto max-w-[1200px]',
  button: 'text-2 text-[#EB4F47]  flex items-center py-2 px-4 gap-5 capitalize',
};
interface Category {
  _id: number;
  name: string;
}

const Subcategory = ({ categories }: { categories: Category[] }) => {
  return (
    <div className={styles.subcategory}>
      {categories &&
        categories.map((category) => (
          <Link
            href={`/?category=${category.name}`}
            scroll={false}
            key={category._id}
            className={styles.button}
          >
            {category.name}
          </Link>
        ))}
    </div>
  );
};

export default Subcategory;
