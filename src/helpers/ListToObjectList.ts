const ListToObjectList = (data: any[] = []) => {
  let obj: any = {};
  data.map(item => {
    obj[item.id] = item;
  });
  return obj;
};
export default ListToObjectList;
