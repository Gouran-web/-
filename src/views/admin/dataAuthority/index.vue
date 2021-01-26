<!--
  -    Copyright (c) 2018-2025, lengleng All rights reserved.
  -
  - Redistribution and use in source and binary forms, with or without
  - modification, are permitted provided that the following conditions are met:
  -
  - Redistributions of source code must retain the above copyright notice,
  - this list of conditions and the following disclaimer.
  - Redistributions in binary form must reproduce the above copyright
  - notice, this list of conditions and the following disclaimer in the
  - documentation and/or other materials provided with the distribution.
  - Neither the name of the www.dcoit.com developer nor the names of its
  - contributors may be used to endorse or promote products derived from
  - this software without specific prior written permission.
  - Author: lengleng (wangiegie@gmail.com)
  -->

<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <el-row>
        <el-col :span="3"
                style='margin-top:15px;'>
          <el-tree class="filter-tree"
                   :data="treeData"
                   :props="defaultProps"
                   node-key="id"
                   highlight-current
                   @node-click="getNodeData"
                   default-expand-all>
          </el-tree>
        </el-col>
        <el-col :span="21"
                style='margin-top:15px;'>
          <data-role-config v-if="dataRoleConfig"></data-role-config>

          <auth-table-config v-if="!dataRoleConfig"></auth-table-config>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>

  import DataRoleConfig from "./dataRoleConfig"
  import AuthTableConfig from "./authTableConfig"
  export default {
    name: 'table_role',
    components:{
      DataRoleConfig,
      AuthTableConfig
    },
    data() {
      return {
        dataRoleConfig:true,

        treeData: [
          {
            id: '1',
            parentId: '',
            name: "数据权限",
            children: [
              {
                id: "2",
                parentId: '1',
                name: '数据角色管理',
                children: []
              },

              {
                id: "3",
                parentId: '1',
                name: '授权表配置',
                children: []
              }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
      }
    },

    created() {
    },

      computed: {
    },

    methods: {
      getNodeData(data){
        //
        if (data.id == 2){
          this.dataRoleConfig = true;
        }

        if (data.id == 3){
          this.dataRoleConfig = false;
        }

      }
    }
  }
</script>
