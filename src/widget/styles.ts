export const styles = `
.emit-widget-container {
  z-index: 2147483647;
}

@media (max-width: 769px) {
  .emit-widget-container {
  }
}

.emit-widget-frame {
    width: 0;
    height: 0;
    position: absolute;
    overflow: hidden;
    z-index: 2147483000;
}
.emit-widget-title {
    background: #dfe1e5;
    color: #484e47;
    font-size: 10px;
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
