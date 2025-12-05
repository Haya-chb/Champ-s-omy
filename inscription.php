<?php

echo`<form action="">









</form>`







?>



<form action="">

<div>
<label for="login">Login :</label><br>
<input type="text" id="login" name="login">
</div>

<div>
<label for="pswd">Groupe Sanguin</label><br>
<input type="password" id="pswd" name="pswd">
</div>

<fieldset>
<legend>Est-tu puceau ?</legend>

<span>
    <input type="checkbox" id="non" name="non"  />
    <label for="non">Non</label>
</span>

<span>
    <input type="checkbox" id="oui" name="oui"  />
    <label for="oui">Oui</label>
</span>

</fieldset>

<div>
<label for="adresse">Quel est ton adresse ?</label><br>
<input type="text" id="adresse" name="adresse">
</div>


<input type="submit" value="Inscription">

</form>