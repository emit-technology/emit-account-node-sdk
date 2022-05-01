export const styles = `
.emit-widget-container {
  position: fixed;
  width: 0px;
  height: 0px;
  top: 0px;
  right: 0px;
  z-index: 2147483647;
}

@media (max-width: 576px) {
  .emit-widget-container {
    bottom: 0;
    top: auto;
  }
}

.emit-widget-frame {
  position: fixed;
  width: 375px;
  height: 0;
  top: 20px;
  right: 20px;
  box-shadow: 0 5px 40px rgba(0,0,0,.16);
  border-radius: 8px;
  overflow: hidden;
  z-index: 2147483000;
}

@media (max-width: 576px) {
  .emit-widget-frame {
    bottom: 0;
    top: auto;
    width: 100%;
    right: 0;
    left: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.emit-widget-title {
    background: #f3eef7;
    color: #484e47;
    font-size: 16px;
    font-weight: 800;
    text-align: center;
    padding: 6px 12px;
}

.emit-widget-url {
    background: #e9ebec;
    padding: 6px 12px;
    color: #000000b5;
    border-top: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
    margin: 0 0 1px 0;
}

.close-btn{
    width: 18px;
    height: 18px;
    float: right;
    background: #ed6a5e;
    border: 1px solid #ed695d;
    border-radius: 50%;
    font-size: 10px;
    text-align: center;
    /* padding: 0px 1px 1px 1px; */
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f7f7f7;
    }
`;
