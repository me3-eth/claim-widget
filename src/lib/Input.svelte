<script>
  export let label
  export let placeholder
  export let value

  export let highlightError = false
  export let validations = []
  export let hasError = !value

  let field
  let id = `field-${Date.now()}`

  function validate (ev) {
    const { value } = ev.target
    hasError = !(validations.every(fn => fn(value)))

    if (highlightError && !hasError) highlightError = false
  }
</script>

<label for={id}>{label}:</label>

<div class="fake-input" class:error={highlightError}>
  <input
    bind:this={field}
    on:input={validate}
    bind:value={value}
    type="text"
    placeholder={placeholder}
    name={id}
    {id}
    />
    <span>.runner.eth</span>
</div>

<style>
  .error {
    border: 1px solid red;
  }

  input {
    border: 0;
    text-align: right;
    outline: 0;
  }

  .fake-input {
    display: inline-block;
    border-radius: 8px;
    border: 1px solid #dedede;
    padding: 8px;
    margin: 8px;
  }
</style>
