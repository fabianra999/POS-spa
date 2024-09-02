<template>
  <HeaderPagesCom :title="$t('userTitle')" :subTitle="$t('userSubTitle')" icon="md:tune"/>
  <v-tabs v-model="tab" align-tabs="center">
    <v-tab value="one">General</v-tab>
    <v-tab value="two">Componentes</v-tab>
    <v-tab value="three">Colores y fondos</v-tab>
    <v-tab value="four">Textos</v-tab>
  </v-tabs>

  <v-card-text>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="one">
        <v-container>
          <v-row>
            <v-col>
              <h3>Tema</h3>
              <p>
                Para iniciar de forma fácil puedes escoger cualquiera de los
                temas o personalizar  appTheme.
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete
                label="variante 2"
                v-model="theme.themeName"
                :items="themeOptions"
                color="borderColor"
                @update:modelValue="themeStore.SET_THEME_NAME()"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-divider class="mt-5 mb-5"></v-divider>
          <v-row>
            <v-col>
              <h3>Logotipo</h3>
              <p>
                Para cambiar el logotipo por favor selecciona una imagen
                preferiblemente con formato .png.
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-file-input
                v-model="logo"
                accept="image/png, image/jpeg, image/bmp"
                label="Entrada de imagen"
                placeholder="Sube tu imagen"
                prepend-icon="mdi-paperclip"
                show-size
                @change="onFileChange"
              ></v-file-input>
              <v-card
                class="mx-auto mt-5 cardLogo"
                subtitle="Vista previa"
                width="400"
                v-if="base64Image"
              >
                <template v-slot:title>
                  <span class="font-weight-black">Logotipo </span>
                </template>

                <v-card-text class="bg-surface-light pt-4">
                  <img
                    class="logoBase64"
                    :src="base64Image"
                    alt="Imagen subida"
                  />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-divider class="mt-5 mb-5"></v-divider>
          <v-row justify="end">
            <v-col cols="2">
              <v-btn color="primary" @click="setComponent('autocomple', theme)"
                >Guardar</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>

      <v-tabs-window-item value="two">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-card
                title="Autocomplete"
                subtitle="La modificación de este componente será de forma global"
                text="El siguiente componente es un ejemplo. Para guardar los cambios oprime el botón guardar."
              >
                <v-card-text class="">
                  <v-row>
                    <v-col>
                      <v-autocomplete
                        label="Autocomplete Ejemplo"
                        :items="[
                          'California',
                          'Colorado',
                          'Florida',
                          'Georgia',
                          'Texas',
                          'Wyoming',
                        ]"
                        :color="theme.autocomple.color"
                        :bg-color="theme.autocomple.bgColor"
                        :base-color="theme.autocomple.baseColor"
                        :variant="theme.autocomple.variant"
                        :clearable="theme.autocomple.clearable"
                        :chips="theme.autocomple.chips"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12"><h5>Editar</h5></v-col>
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        label="variante"
                        v-model="theme.autocomple.variant"
                        :items="[
                          'outlined',
                          'underlined',
                          'solo',
                          'solo-filled',
                          'solo-inverted',
                        ]"
                      ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                      class="d-flex justify-center align-center"
                    >
                      <v-switch
                        theme="myCustomLightTheme"
                        v-model="theme.autocomple.clearable"
                        label="clearable"
                        class="mr-2"
                        width="50%"
                      ></v-switch>
                      <v-switch
                        v-model="theme.autocomple.chips"
                        color="primary"
                        label="chips"
                        width="50%"
                      ></v-switch>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                      class="d-flex justify-center align-center"
                    >
                      <v-menu class="mr-2">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="mr-2"
                            width="50%"
                            color="primary"
                            v-bind="props"
                          >
                            color
                          </v-btn>
                        </template>
                        <v-color-picker
                          v-model="theme.autocomple.color"
                          show-swatches
                        ></v-color-picker>
                      </v-menu>

                      <v-menu>
                        <template v-slot:activator="{ props }">
                          <v-btn width="50%" color="primary" v-bind="props">
                            bg-Color
                          </v-btn>
                        </template>
                        <v-color-picker
                          v-model="theme.autocomple.bgColor"
                          show-swatches
                        ></v-color-picker>
                      </v-menu>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                      class="d-flex justify-center align-center"
                    >
                      <v-menu>
                        <template v-slot:activator="{ props }">
                          <v-btn width="50%" color="primary" v-bind="props">
                            baseColor
                          </v-btn>
                        </template>
                        <v-color-picker
                          v-model="theme.autocomple.baseColor"
                          show-swatches
                        ></v-color-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider class=""></v-divider>
                <v-card-actions>
                  <v-btn @click="setComponent('autocomple', theme)">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card
                title="Text-field"
                subtitle="La modificación de este componente será de forma global"
                text="El siguiente componente es un ejemplo. Para guardar los cambios oprime el botón guardar."
              >
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Label Ejemplo"
                        :color="theme.textField.color"
                        :bg-color="theme.textField.bgColor"
                        :base-color="theme.textField.baseColor"
                        :variant="theme.textField.variant"
                        :clearable="theme.textField.clearable"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12"><h5>Editar</h5></v-col>
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        label="variante"
                        v-model="theme.textField.variant"
                        :items="[
                          'outlined',
                          'underlined',
                          'solo',
                          'solo-filled',
                          'solo-inverted',
                        ]"
                      ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                      class="d-flex justify-center align-center"
                    >
                      <v-switch
                        theme="myCustomLightTheme"
                        v-model="theme.textField.clearable"
                        label="clearable"
                        class="mr-2"
                        width="50%"
                      ></v-switch>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                      class="d-flex justify-center align-center"
                    >
                      <v-menu class="mr-2">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="mr-2"
                            width="50%"
                            color="primary"
                            v-bind="props"
                          >
                            color
                          </v-btn>
                        </template>
                        <v-color-picker
                          v-model="theme.textField.color"
                          show-swatches
                        ></v-color-picker>
                      </v-menu>

                      <v-menu>
                        <template v-slot:activator="{ props }">
                          <v-btn width="50%" color="primary" v-bind="props">
                            bg-Color
                          </v-btn>
                        </template>
                        <v-color-picker
                          v-model="theme.textField.bgColor"
                          show-swatches
                        ></v-color-picker>
                      </v-menu>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                      class="d-flex justify-center align-center"
                    >
                      <v-menu>
                        <template v-slot:activator="{ props }">
                          <v-btn width="50%" color="primary" v-bind="props">
                            baseColor
                          </v-btn>
                        </template>
                        <v-color-picker
                          v-model="theme.textField.baseColor"
                          show-swatches
                        ></v-color-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider class=""></v-divider>
                <v-card-actions>
                  <v-btn @click="setComponent('textField', textField)">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card
                title="Button"
                subtitle="La modificación de este componente será de forma global"
                text="El siguiente componente es un ejemplo. Para guardar los cambios oprime el botón guardar."
              >
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-btn
                        :variant="theme.textField.variant"
                        :size="theme.textField.size"
                        :rounded="theme.textField.rounded"
                        :color="theme.textField.color"
                      >
                        Button Ejemplo
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12"><h5>Editar</h5></v-col>
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        label="variante"
                        v-model="theme.textField.variant"
                        :items="[
                          'elevated',
                          'flat',
                          'tonal',
                          'outlined',
                          'text',
                          'plain',
                        ]"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        label="size"
                        v-model="theme.textField.size"
                        :items="['x-small', 'small', 'large', 'x-large']"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        label="rounded"
                        v-model="theme.textField.rounded"
                        :items="['0', 'xs', 'sm', 'x-large', 'lg', 'xl']"
                      ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                      class="d-flex justify-center align-center"
                    >
                      <v-menu class="mr-2">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="mr-2"
                            width="50%"
                            color="primary"
                            v-bind="props"
                          >
                            color
                          </v-btn>
                        </template>
                        <v-color-picker
                          v-model="theme.textField.color"
                          show-swatches
                        ></v-color-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider class=""></v-divider>
                <v-card-actions>
                  <v-btn @click="setComponent('buttonField', buttonField)">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>

      <v-tabs-window-item value="three">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-card
                title="Color Fondo"
                subtitle="La modificación de este componente será de forma global"
                text="El siguiente componente es un ejemplo. Para guardar los cambios oprime el botón guardar."
              >
                <v-card-text>
                  <v-row>
                    <v-col>
                      <h3>background</h3>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-btn :color="theme.common.background">
                        Button Ejemplo
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12"><h5>Editar</h5></v-col>
                    <v-col class="d-flex justify-center align-center">
                      <v-menu class="mr-2">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="mr-2"
                            width="50%"
                            color="primary"
                            v-bind="props"
                          >
                            color
                          </v-btn>
                        </template>
                        <v-color-picker
                          v-model="theme.common.background"
                          show-swatches
                        ></v-color-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="setComponent('autocomple', theme)"
                    >Click me</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card
                title="Color NavBar"
                subtitle="La modificación de este componente será de forma global"
                text="El siguiente componente es un ejemplo. Para guardar los cambios oprime el botón guardar."
              >
                <v-card-text>
                  <v-row>
                    <v-col>
                      <h3>background</h3>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-btn :color="theme.common.navBar">
                        Button Ejemplo
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12"><h5>Editar</h5></v-col>
                    <v-col class="d-flex justify-center align-center">
                      <v-menu class="mr-2">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="mr-2"
                            width="50%"
                            color="primary"
                            v-bind="props"
                          >
                            color
                          </v-btn>
                        </template>
                        <v-color-picker
                          v-model="theme.common.navBar"
                          show-swatches
                        ></v-color-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="setComponent('autocomple', theme)"
                    >Click me</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card
                title="Color SideBar"
                subtitle="La modificación de este componente será de forma global"
                text="El siguiente componente es un ejemplo. Para guardar los cambios oprime el botón guardar."
              >
                <v-card-text>
                  <v-row>
                    <v-col>
                      <h3>background</h3>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-btn :color="theme.common.sidebar">
                        Button Ejemplo
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12"><h5>Editar</h5></v-col>
                    <v-col class="d-flex justify-center align-center">
                      <v-menu class="mr-2">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="mr-2"
                            width="50%"
                            color="primary"
                            v-bind="props"
                          >
                            color
                          </v-btn>
                        </template>
                        <v-color-picker
                          v-model="theme.common.sidebar"
                          show-swatches
                        ></v-color-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="setComponent('autocomple', theme)"
                    >Click me</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card
                title="Color Footer"
                subtitle="La modificación de este componente será de forma global"
                text="El siguiente componente es un ejemplo. Para guardar los cambios oprime el botón guardar."
              >
                <v-card-text>
                  <v-row>
                    <v-col>
                      <h3>background</h3>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-btn :color="theme.common.footer">
                        Button Ejemplo
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12"><h5>Editar</h5></v-col>
                    <v-col class="d-flex justify-center align-center">
                      <v-menu class="mr-2">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="mr-2"
                            width="50%"
                            color="primary"
                            v-bind="props"
                          >
                            color
                          </v-btn>
                        </template>
                        <v-color-picker
                          v-model="theme.common.footer"
                          show-swatches
                        ></v-color-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="setComponent('autocomple', theme)"
                    >Click me</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>

      <v-tabs-window-item value="four">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-card
                title="Color title"
                subtitle="La modificación de este componente será de forma global"
                text="El siguiente componente es un ejemplo. Para guardar los cambios oprime el botón guardar."
              >
                <v-card-text>
                  <v-row>
                    <v-col>
                      <h3>background</h3>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-btn :color="theme.common.title">
                        Button Ejemplo
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12"><h5>Editar</h5></v-col>
                    <v-col class="d-flex justify-center align-center">
                      <v-menu class="mr-2">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="mr-2"
                            width="50%"
                            color="primary"
                            v-bind="props"
                          >
                            color
                          </v-btn>
                        </template>
                        <v-color-picker
                          v-model="theme.common.title"
                          show-swatches
                        ></v-color-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="setComponent('autocomple', theme)"
                    >Click me</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card
                title="Color text"
                subtitle="La modificación de este componente será de forma global"
                text="El siguiente componente es un ejemplo. Para guardar los cambios oprime el botón guardar."
              >
                <v-card-text>
                  <v-row>
                    <v-col>
                      <h3>background</h3>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-btn :color="theme.common.text"> Button Ejemplo </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12"><h5>Editar</h5></v-col>
                    <v-col class="d-flex justify-center align-center">
                      <v-menu class="mr-2">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="mr-2"
                            width="50%"
                            color="primary"
                            v-bind="props"
                          >
                            color
                          </v-btn>
                        </template>
                        <v-color-picker
                          v-model="theme.common.text"
                          show-swatches
                        ></v-color-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="setComponent('autocomple', theme)"
                    >Click me</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card
                title="Color iconHeader"
                subtitle="La modificación de este componente será de forma global"
                text="El siguiente componente es un ejemplo. Para guardar los cambios oprime el botón guardar."
              >
                <v-card-text>
                  <v-row>
                    <v-col>
                      <h3>background</h3>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-btn :color="theme.common.iconHeader">
                        Button Ejemplo
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12"><h5>Editar</h5></v-col>
                    <v-col class="d-flex justify-center align-center">
                      <v-menu class="mr-2">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="mr-2"
                            width="50%"
                            color="primary"
                            v-bind="props"
                          >
                            color
                          </v-btn>
                        </template>
                        <v-color-picker
                          v-model="theme.common.iconHeader"
                          show-swatches
                        ></v-color-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="setComponent('autocomple', theme)"
                    >Click me</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card-text>
</template>
<route lang="yaml">
meta:
  layout: default
  requiresAuth: true
</route>
<script setup>
import { reactive, onMounted, ref, computed, watch, toRaw } from "vue";
import { useTheme } from "vuetify";
import { storeToRefs } from "pinia";
import { usethemeStore } from "@/stores/theme";

const themeStore = usethemeStore();

const { theme } = storeToRefs(themeStore);
const themeOptions = [
  "light",
  "dark",
  "appTheme",
  "customDarkTheme",
  "customLightTheme",
];
const tab = ref(null);
const base64Image = ref(null);

const backgroundName = computed({
  get() {
    return themeStore.theme.common.background;
  },
  set(value) {
    themeStore.theme.common.background = value;
    theme.current.value.colors.background = value;
  },
});

function toggleTheme() {
  const theme = useTheme();
  theme.global.name.value = theme.global.current.value.dark
    ? themeStore.theme.themeName
    : "dark";
}

const setComponent = (typePayload, payload) => {
  themeStore.SET_COMPONENT(typePayload, payload);
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const base64String = e.target.result;
    console.log(base64String);

    base64Image.value = base64String;
    themeStore.SET_THEME_INPUT("logo", base64String);
  };
  reader.readAsDataURL(file);
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.containerComponents {
  margin-top: 4em;
}
.cardLogo {
  text-align: center;
  .logoBase64 {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
  }
}
</style>
