import ProductEditDialog from './ProductEditDialog';
import AdminAddCategory from './AdminAddCategory';
import AdminAddProduct from './AdminAddProduct';
import { description } from './InsigthChart';

const AdminProducts = ({ products }) => {
  return (
    <div>
      <div className=" px-5 pt-5 flex justify-between">
        <AdminAddCategory />
        <AdminAddProduct />
      </div>
      <div className="flex flex-wrap gap-5 p-5">
        {products &&
          products.map((products) => (
            <ProductEditDialog
              title={products.name}
              price={products.price}
              imgUrl={`https://pub-085cb38b95fb4b51936e3f399499e3cd.r2.dev/joy/${products.image[0]}`}
              rating="4"
              description={products.description}
              discount={products.discount}
            />
          ))}
      </div>
    </div>
  );
};

export default AdminProducts;
