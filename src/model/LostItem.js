import SuperItem from './SuperItem'

class LostItem extends SuperItem{
  constructor() {
    super();
    this.beginTime = 0;
    this.endTime = 0;
  }
}

export default LostItem;