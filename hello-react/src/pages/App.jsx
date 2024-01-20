import AddForm from "./AddForm";
import CheckList from "./CheckList";

export default function App({ list, add, toggle, remove }) {

  return (<div role="main">
    <AddForm add={add} />
    <CheckList
      list={list.filter(item => !item.done)} remove={remove} toggle={toggle} />
    <CheckList
      list={list.filter(item => item.done)} remove={remove} toggle={toggle} done={true} />
  </div>);
}