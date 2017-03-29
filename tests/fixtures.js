
export const basicTemplate = `<mmm>
  <mmm-head>
    <mmm-title>Impending Cat-astrophe</mmm-title>
    <mmm-font name="Source Sans Pro" provider="google" weight="300,400" subset="latin-ext" />
    <mmm-merge name="user.firstname" value="Ian" />
    <mmm-merge name="user.email" value="support@mizmoz.com" />
    <mmm-merge name="style.fontWeight" value="12" />
  </mmm-head>
  <mmm-body style="background: #add8c7">
    <mmm-row width="100%" content-width="600px" spacing="both" spacing-width="12px" spacing-color="yellow" padding="12px">
      <mmm-column>
        <mmm-button text="Find out more" url="https://www.mizmoz.com/" />
        <mmm-box background-color="purple" align="center">
          RAR
        </mmm-box>
      </mmm-column>
    </mmm-row>
  </mmm-body>
</mmm>`;

export const basicTemplateX = `<mmm>
  <mmm-head>
    <mmm-title>Impending Cat-astrophe</mmm-title>
    <mmm-font name="Source Sans Pro" provider="google" weight="300,400" subset="latin-ext" />
    <mmm-merge name="user.firstname" value="Ian" />
    <mmm-merge name="user.email" value="support@mizmoz.com" />
    <mmm-merge name="styles.fontWeight" value="12" />
  </mmm-head>
  <mmm-body style="background: #add8c7">
    <mmm-row width="100%" content-width="600px" spacing="both" spacing-width="12px" spacing-color="yellow" padding="12px">
      <mmm-column>
        <mmm-image src="https://www.mizmoz.com/api/media/display/1/dvwarBUD00V4FX5q681P.jpg" url="https://www.mizmoz.com/" />
        <p>Welcome {{user.firstname}} to this email!</p>
        <mmm-button text="Find out more" url="https://www.mizmoz.com/" />
      </mmm-column>
    </mmm-row>
  </mmm-body>
</mmm>`;
