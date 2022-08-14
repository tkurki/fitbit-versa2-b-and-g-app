function Colors(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Server</Text>}>
          <TextInput
             label="Address"
            value={{ name: props.settingsStorage.getItem('ipAddress') || '127.0.0.1:3000' }}
            onChange={(value) => {
              props.settingsStorage.setItem('ipAddress', value.name);
            }}
          />
      </Section>
    </Page>
  );
}

registerSettingsPage(Colors);