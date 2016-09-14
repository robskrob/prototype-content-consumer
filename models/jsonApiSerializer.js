module.exports = (attributes) => {
  return (models) => {
    if (!Array.isArray(models)) {
      models = [models];
    }

    let data = models.reduce((list, model) => {
      if (model) {
        list.push({
          "type": model.key.kind,
          "id": model.key.id,
          "attributes": attributes.reduce((previous, attribute) => {
            previous[attribute] = model.data[attribute];
            return previous;
          }, {})
        });
      }

      return list;
    }, []);

    return {
      "data": data,
      "jsonapi": "1.0.0"
    };
  };
};
