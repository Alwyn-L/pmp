import type { Directive } from 'vue'
import { useUserStore } from '@/stores/user'

/** v-perm="'biz:purchase-order:create'"：无权限则移除元素。 */
const perm: Directive = {
  mounted(el, binding) {
    const user = useUserStore()
    if (binding.value && !user.hasPerm(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  }
}

export default perm
