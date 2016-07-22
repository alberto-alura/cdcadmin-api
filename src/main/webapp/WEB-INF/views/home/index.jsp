<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style>
.paypal-button button.large {
	min-width: 150px;
}

.paypal-label {
	margin-left: 30px;
}

.paypal-input {
	margin: 0 20px !important;
	width: 100px !important;
	height: 25px !important;
	border-radius: 5px !important;
	text-align: center !important;
}

.paypal-button {
	min-height: 40px;
}

.textPay {
	text-align: center;
	margin: 10px 50px;
	font-size: 13px;
	display: block;
}
#usd-button form ,
#brl-button form {
	margin: 0;
}

#usd-button img,
#brl-button img {
	margin: 20px auto 0 auto;
	display: block;
}

</style><title>Home page</title>
</head>
<body> 
		<p>Your project is configured! Now, what do you think about donate :)?</p>
		<div id="brl-button">
			<img src="http://www.setupmyproject.com/images/flags/ptbr.png" alt="brazilian flag"/> 
			<p class="textPay">
				A nossa ideia ?? que voc?? inicie o seu projeto o mais r??pido poss??vel, sem perder tempo configurando frameworks e outros detalhes. Ainda tem muito mais por vir, projetos j?? com templates configurados, mais op????es de plugins dentro dos frameworks etc. Entendemos que nosso projeto realmente faz voc?? economizar tempo, ent??o, se for poss??vel, gostar??amos que voc?? nos desse uma ajuda fazendo uma doa????o.  									
			</p>
			<p class="textPay">
				A nossa conta do Paypal ?? brasileira e, se a sua conta no Paypal tamb??m for brasileira, por conta das leis do nosso pa??s, temos que pedir que voc?? doe em reais. Ao lado tem a nossa sugest??o :).
			</p>
			<form method="post" action="https://www.paypal.com/cgi-bin/webscr" class="paypal-button" target="_top">
					<div class="hide" id="errorBox"></div>
						<input type="hidden" name="button" value="donate"/>
						<input type="hidden" name="item_name" value="Configured project"/>						
					
						<input type="hidden" name="env" value=""/>
						<input type="hidden" name="currency_code" value="BRL"/>
						<input type="hidden" name="lc" value="pt_BR"/>
						<input type="hidden" name="cmd" value="_donations"/>
						<input type="hidden" name="business" value="DVGVTVC3E9TAN"/>
						<input type="hidden" name="bn" value="JavaScriptButton_donate"/>
						<button type="submit" class="paypal-button large">Doar</button>
				</form>					
			
			
		</div>
		<div id="usd-button">
			<img src="http://www.setupmyproject.com/images/flags/usen.png" alt="non brazilian flag"/>
			<p class="textPay">
				Our main goal is that you can start your project as fast as possible, without wasting time setting up frameworks and other details. There are a lot of things to come like project with already configured templates, more options of plugins for each framework etc. We really think that our project saves your time, so, if you can, we would like that you to contribute with us making a donation. 
			</p>
			<p class="textPay">
				If you want to donate in dollar, use this button :).				
			</p>
			<form method="post" action="https://www.paypal.com/cgi-bin/webscr" class="paypal-button" target="_top">
					<div class="hide" id="errorBox"></div>
						<input type="hidden" name="button" value="donate"/>
						<input type="hidden" name="item_name" value="Configured project"/>
					
						<input type="hidden" name="env" value=""/>
						<input type="hidden" name="currency_code" value="USD"/>
						<input type="hidden" name="lc" value="en_US"/>
						<input type="hidden" name="cmd" value="_donations"/>
						<input type="hidden" name="business" value="DVGVTVC3E9TAN"/>
						<input type="hidden" name="bn" value="JavaScriptButton_donate"/>
						<button type="submit" class="paypal-button large">Donate</button>
			</form>			
		</div>			</body>
</html>