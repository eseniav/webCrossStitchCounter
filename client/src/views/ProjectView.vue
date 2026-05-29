<template>
  <div>
    <h2>Дневник проекта</h2>
    <p>Здесь будет отображаться дневник проекта.</p>
  </div>
</template>

<script>
async function getProject(projectId) {
    const res = await fetch(`/api/project/${projectId}`);
    const data = await res.json();
    return data;
}
    export default {
    data() {
        return {
        project: {},
        }
    },

  methods: {

  },
  computed: {
    projectId(){return this.$route.params.projectId}
  },

  async mounted() {
    this.project = await getProject(this.projectId);
    console.log(this.project);
  }
}
</script>
