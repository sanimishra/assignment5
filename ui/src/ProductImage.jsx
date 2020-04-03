/* globals React */

export default function ProductImage({ match }) {
    const { id } = match.params;
    return (
      <h2>{`This is a placeholder for showing image ${id}`}</h2>
    );
  }