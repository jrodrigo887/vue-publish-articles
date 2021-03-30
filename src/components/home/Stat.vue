<template>
  <div class="static">
      <div class="stat-icon">
          <i :class="icon" :style="style"></i>

      </div>
    <div class="stat-info">
        <span class="stat-title">{{ title }}</span>
        <span class="stat-value">{{ value }}</span>

    </div>
  </div>
</template>

<script>
export default {
    name: 'Stat',
    props: {
        title: '',
        icon: '',
        color: '',
        value: ''
    },

    computed: {
        style() {
            return "color: " + (this.color || '#00000')
        }
    }

}
</script>

<style>
.static {
    flex: 1;
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    margin-right: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, .3);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.stat-icon {
    display: flex;
    align-items: center;

}

.stat-icon i {
    font-size: 5rem;
}

.stat-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 1.1rem;
}

.stat-value {
    font-size: 2.5em;
}




</style>