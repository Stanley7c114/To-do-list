import React, { Component } from "react";
class ListHeader extends Component {
  render({listName}){
    return (
      <div>
        {listName}
      </div>
    );
  }
}

export default ListHeader;