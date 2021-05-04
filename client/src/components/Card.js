export const cardTypes = {
  image: 'image'
};

function Card (props) {

  const generateImageCard = (image, imageAlt, clickHandler) => (
    <div className="card-image" onClick={() => clickHandler()}>
      <figure className="image is-16by9">
        <img src={image} alt={imageAlt} />
      </figure>
    </div>
  );

  switch (props.cardType) {
    case cardTypes.image:
      const imageCard = generateImageCard(props.image, props.imageAlt, props.clickHandler);

      return (
        <div>
          <div className="card">
            { imageCard }
          </div>
        </div>
      );

    default:
      return (
        <p>Please specify a type</p>
      );
  }
};

export default Card;
