import React from "react";
import { Button, Card } from "antd";
import { useDispatch } from "react-redux";
const { Meta } = Card;

const ItemsList = ({ item }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () =>{
        dispatch({
            type: 'updateCart',
            payload:{...item, quantity:1}
        })
    }
  return (
    <div>
      <Card
      
        hoverable
        style={{
          width: 240, 
          marginBottom: 20
        }}
        cover={
          <img
            alt={item.name}
            src={item.image}
            style={{
                height: 250, 
               
              }}
          />
        }
      >
        <Meta title={item.name} />
        <div className="item-button">
            <Button onClick={() => handleAddToCart()}>Add To Cart</Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemsList;
