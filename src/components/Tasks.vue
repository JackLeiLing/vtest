<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <h1 class="text-h5 text-blue-darken-4 mb-3 font-weight-bold">Tasks</h1>

      <v-row>
        <v-col cols="10" md="11">
          <v-text-field
            placeholder="Add new task..."
            density="compact"
          ></v-text-field>
        </v-col>

        <v-col cols="2" md="1">
          <v-btn icon="mdi-plus" color="blue" size="small"></v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-list>
            <v-list-item title="task 1">
              <template v-slot:prepend>
                <v-icon icon="mdi-circle-outline" color="orange" />
              </template>
              <template v-slot:append>
                <v-btn
                  icon="mdi-pencil-outline"
                  color="green-darken-4"
                  size="small"
                />
                <v-btn
                  icon="mdi-delete-outline"
                  color="red-darken-4"
                  size="small"
                />
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
//
</script>
