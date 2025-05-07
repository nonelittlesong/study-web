<template>
  <div>
    <div class="language-switcher">
      <el-button @click="changeLanguage('zh')">中文</el-button>
      <el-button @click="changeLanguage('en')">English</el-button>
      <el-button @click="changeLanguage('ar')">العربية</el-button>
    </div>
    
    <el-table :data="userData">
      <el-table-column 
        prop="name" 
        :label="userLabels.name" 
        :width="userColumnWidths.name">
      </el-table-column>
      <el-table-column 
        prop="email" 
        :label="userLabels.email" 
        :width="userColumnWidths.email">
      </el-table-column>
      <el-table-column 
        prop="role" 
        :label="userLabels.role" 
        :width="userColumnWidths.role">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import languageAware from '@/mixins/language-aware';

export default {
  mixins: [languageAware],
  
  data() {
    return {
      userData: [
        { name: '张三', email: 'zhangsan@example.com', role: '管理员' },
        { name: '李四', email: 'lisi@example.com', role: '用户' }
      ],
      labelConfig: {
        user: {
          name: { zh: '姓名', en: 'Name', ar: 'الاسم' },
          email: { zh: '邮箱', en: 'Email', ar: 'البريد الإلكتروني' },
          role: { zh: '角色', en: 'Role', ar: 'دور' }
        }
      }
    };
  },
  
  computed: {
    userColumnWidths() {
      return this.getColumnWidths('user');
    },
    
    userLabels() {
      const lang = this.currentLanguage;
      const result = {};
      
      for (const key in this.labelConfig.user) {
        result[key] = this.labelConfig.user[key][lang] || this.labelConfig.user[key].zh;
      }
      
      return result;
    }
  }
}
</script>