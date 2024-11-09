import { useSelector } from "react-redux";
import { filterProducts } from "../../store/products";

const ProductComponent = () => {
  // A lógica fica concentrada na store, e os componentes são
  // utilizados mais como uma camada de apresentação
  const data = useSelector(filterProducts);

  return (
    <table>
      <thead>
        <tr>
          <th>nome</th>
          <th>cor</th>
          <th>preco</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, name, color, price }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{color}</td>
            <td>R$ {price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductComponent;
