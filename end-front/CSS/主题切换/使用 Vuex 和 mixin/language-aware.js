// mixins/language-aware.js
import { mapGetters } from 'vuex';
import tableWidths from '@/config/table-column-widths';

export default {
  computed: {
    ...mapGetters(['currentLanguage']),
    
    // 根据表格类型获取对应的列宽配置
    getColumnWidths() {
      return (tableType) => {
        const config = tableWidths[tableType] || {};
        
        // 转换为当前语言的宽度
        const result = {};
        for (const key in config) {
          result[key] = config[key][this.currentLanguage] || config[key].zh;
        }
        
        return result;
      };
    }
  },
  methods: {
    changeLanguage(lang) {
      this.$store.dispatch('setLanguage', lang);
    }
  }
}