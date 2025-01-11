import ProductEditDialog from './ProductEditDialog';
import AdminAddCategory from './AdminAddCategory';
import AdminAddProduct from './AdminAddProduct';

interface Product {
  _id: string;
  name: string;
  price: string;
  image: string[];
  description: string;
  discount: string;
  location: [number, number];
}

interface AdminProductsProps {
  products: Product[];
}

const AdminProducts: React.FC<AdminProductsProps> = ({ products }) => {
  return (
    <div>
      <div className="px-5 pt-5 flex justify-between">
        <AdminAddCategory />
        <AdminAddProduct />
      </div>
      <div className="flex flex-wrap gap-5 p-5">
        {products &&
          products.map((product) => (
            <ProductEditDialog
              key={product._id}
              _id={product._id}
              title={product.name}
              price={product.price}
              imgUrl={`https://pub-085cb38b95fb4b51936e3f399499e3cd.r2.dev/${product.image[0]}.jpg`}
              rating="4"
              description={product.description}
              discount={product.discount}
              productLocation={product.location}
            />
          ))}
      </div>
    </div>
  );
};

export default AdminProducts;
