<template>
  <div class="comments-container">
    <div class="comment-bubble" v-for="com in comments" :key="com.id">
      <p>{{ com.comment }}</p>
    </div>
    <div class="comment-form">
      <textarea id="comment-input" placeholder="Напишите свой комментарий..."></textarea>
      <button id="submit-btn" class="authBtn">Отправить</button>
    </div>
    </div>
</template>

<script>
async function getComments(projectId) {
    const res = await fetch(`/api/comments/${projectId}`);
    const data = await res.json();
    return data;
}
 export default {
    data() {
        return {
          comments: []
        }
    },

  methods: {
    
    },

  computed: {
    projectId(){return this.$route.params.projectId}
  },
  
  async mounted() {
    this.comments = await getComments(this.projectId);
    console.log(this.comments);
  }
}
</script>
