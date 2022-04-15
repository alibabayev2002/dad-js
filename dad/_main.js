Object.prototype.dad = function(config){
    if(!config.item){
        throw new Error('Item not found');
    }
    let self = this;
    function _commit(){
        let _list_items = document.querySelectorAll(config.item);
        self.element = null;
        for (const [_key,_item] of Object.entries(_list_items)){
            _item.addEventListener('dragstart',(e) =>{
                self.element = _item;
                self.element.style.opacity = '.5';
            });
            _item.addEventListener('dragover',(event) =>{
                event.preventDefault();
            });
        }
    }
    _commit();
    for (const [_key,_item] of Object.entries(self)){
        if(!_item){
            console.log(_item);
            continue;
        }
        _item.addEventListener('dragover',( event)=>{
            event.preventDefault();
        });
        _item.addEventListener('drop',(e)=>{
            e.preventDefault();
            if(this.element.closest(config.column) === _item || !this.element){
                this.element = null;
                return;
            }
            this.element.style.opacity = '1';
            _item.querySelector('.list-column-body').insertAdjacentHTML('beforeend',this.element.outerHTML);
            this.element.remove();
            this.element = null;
            _commit();
        });
    }
};
