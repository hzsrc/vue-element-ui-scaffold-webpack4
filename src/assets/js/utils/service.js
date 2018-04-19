/*****************************************************************
 ** Copyright (c) 上海帜讯（flaginfo）南京分公司研发部
 ** 创建人:      hc
 ** 创建日期:    2017/10/23
 ** 修改人:
 ** 修改日期:
 ** 描 述:
 **-----------------------------------------------------------------
 ******************************************************************/

import $$x from '../../js/$x.js'

const defaultUrls = {
    getOrgSubNodes: '/Organize/Privilege/Child',
    queryBranch: '/Orgnize/GetOrgOrMemberByName'
}

export default {
    loadSubNodes (node, resolve) {
        $$x.post(defaultUrls.getOrgSubNodes, {id: node.key}, {showError: true})
            .then(res => {
                if (!node.data.canClick) {
                    resolve([]);
                }
                else {
                    res.data.orgList.forEach(function (item) {
                        if (item.hasChild > 0) {
                            item.isLeaf = false
                        }
                        else {
                            item.isLeaf = true
                        }
                    })

                    var childData = res.data.orgList || []
                    if (!node.data.childNodes) {
                        node.data.childNodes = childData
                    }
                    else {
                        node.data.childNodes.splice(0, node.data.childNodes.length)
                        node.data.childNodes.push(childData)
                    }

                    resolve(childData)
                }
            });
    }
}
