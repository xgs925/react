const mode = process.env.NODE_ENV !== 'production' ? 'development' : 'production'
const dev_conf = {
    serverUrl: '//test.sogou.com'
};

const pro_conf = {
    serverUrl: '//online.sogou.com'
};

const conf = {
    showTitle: true
};

if(mode === 'development'){
    Object.assign(conf, dev_conf);
}else{
    Object.assign(conf, pro_conf);
}

export default conf;
