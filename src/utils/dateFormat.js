const formatISODate = (ISODate) =>
  new Date(ISODate).toLocaleString('en-us', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default formatISODate;
